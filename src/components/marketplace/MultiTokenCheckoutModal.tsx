import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Coins,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Sliders,
  Wallet,
  ExternalLink
} from 'lucide-react';

export const MultiTokenCheckoutModal: React.FC = () => {
  const {
    t,
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutTargetTask,
    activeWallet,
    acquireYD,
    theme,
    locale
  } = useApp();

  const [selectedToken, setSelectedToken] = useState<'USDC' | 'ETH' | 'USDT' | 'WETH'>('USDC');
  const [targetYDAmount, setTargetYDAmount] = useState<number>(1000);
  const [slippage, setSlippage] = useState<string>('0.5%');
  const [isSimulating, setIsSimulating] = useState(false);
  const [txStep, setTxStep] = useState<number>(1); // 1: Quote, 2: Approving, 3: Swapping, 4: Confirmed
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (checkoutTargetTask) {
      setTargetYDAmount(checkoutTargetTask.rewardYD + (checkoutTargetTask.platformFeeYD || 20));
    }
  }, [checkoutTargetTask]);

  if (!isCheckoutOpen) return null;

  const isDark = theme === 'dark';

  // Calculate simulated rate based on selected token
  const rates: Record<string, number> = {
    USDC: 1.0,      // 1 USDC = 1 YD
    USDT: 1.0,      // 1 USDT = 1 YD
    ETH: 0.0004,    // 1 ETH ≈ 2,500 YD
    WETH: 0.0004
  };

  const calculatedInputAmount = Number((targetYDAmount * rates[selectedToken]).toFixed(4));
  const walletTokenBalance = (activeWallet.balances as any)[selectedToken] || 0;
  const hasSufficientToken = walletTokenBalance >= calculatedInputAmount;

  const handleExecuteTransaction = () => {
    setIsProcessing(true);
    setTxStep(2); // Approval

    setTimeout(() => {
      setTxStep(3); // Swapping on 0x
      setTimeout(() => {
        acquireYD(selectedToken, calculatedInputAmount, targetYDAmount);
        setTxStep(4); // Confirmed
        setIsProcessing(false);
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => {
          if (!isProcessing) setIsCheckoutOpen(false);
        }}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div
        id="multi-token-checkout-modal"
        className={`relative z-10 w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden flex flex-col ${
          isDark
            ? 'bg-[#0E1628] border-[#1F2D4A] text-[#F8FAFC]'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between border-slate-700/20">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#F59E0B]/20 text-[#F59E0B]">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base">{t('checkout_title')}</h3>
              <p className="text-[11px] text-slate-400 font-mono">0x Protocol · Exact-Output Swap</p>
            </div>
          </div>

          {!isProcessing && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-lg border border-slate-700/30 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-xs">
          {txStep < 4 ? (
            <>
              {/* Target YD Needed Input */}
              <div
                className={`p-4 rounded-xl border space-y-1.5 ${
                  isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>{t('exact_yd_needed')}</span>
                  <span>{t('payment_wallet')}: {activeWallet.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    value={targetYDAmount}
                    onChange={(e) => setTargetYDAmount(Math.max(1, Number(e.target.value)))}
                    className="w-2/3 bg-transparent text-xl font-display font-bold font-mono-tabular text-[#F59E0B] focus:outline-none"
                  />
                  <span className="font-bold text-sm text-[#F59E0B] px-2 py-1 rounded bg-[#F59E0B]/15">
                    YD
                  </span>
                </div>
              </div>

              {/* Pay with Token Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span>{t('pay_with_token')}</span>
                  <span className="font-mono-tabular">
                    Balance: {walletTokenBalance} {selectedToken}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {(['USDC', 'ETH', 'USDT', 'WETH'] as const).map((tok) => {
                    const isSelected = selectedToken === tok;
                    return (
                      <button
                        key={tok}
                        onClick={() => setSelectedToken(tok)}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                          isSelected
                            ? 'bg-[#0284C7] text-[#0A101F] border-[#0284C7] shadow-xs'
                            : isDark
                            ? 'bg-[#0A101F] border-[#1F2D4A] text-slate-300 hover:border-slate-600'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {tok}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 0x Quote Route Summary */}
              <div
                className={`p-3.5 rounded-xl border space-y-2 font-mono-tabular ${
                  isDark ? 'bg-[#0A101F]/80 border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between text-slate-400">
                  <span>{t('exchange_rate')}</span>
                  <span className="text-slate-200">
                    1 {selectedToken} ≈ {(1 / rates[selectedToken]).toLocaleString()} YD
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Cost</span>
                  <span className="font-semibold text-slate-200">
                    {calculatedInputAmount} {selectedToken}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t('price_impact')}</span>
                  <span className="text-[#10B981]">{'< 0.04%'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t('slippage_tolerance')}</span>
                  <span className="text-slate-200">{slippage}</span>
                </div>
                <div className="pt-2 border-t border-slate-700/30 flex justify-between items-center text-[#10B981] font-sans text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> {t('alchemy_sim')}
                  </span>
                  <span className="font-mono">{t('sim_passed')}</span>
                </div>
              </div>

              {/* Transaction Progress Indicator */}
              {isProcessing && (
                <div className="p-3 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#6366F1] font-semibold">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>
                      {txStep === 2 ? t('step_token_approval') : t('step_swap_yd')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Broadcasting signed transaction to Base Sepolia validator node...
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Step 4: Transaction Confirmed */
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-base text-[#10B981]">
                Swap & Escrow Deposit Confirmed!
              </h4>
              <p className="text-xs text-slate-400">
                Successfully acquired {targetYDAmount.toLocaleString()} YD and funded your task escrow balance.
              </p>
              <div className="p-3 rounded-xl bg-[#0A101F] border border-[#1F2D4A] text-[11px] font-mono text-slate-400">
                Tx: 0x8f2d...6e12 (Base Block #22C55E04)
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-700/20 flex items-center justify-between gap-3">
          {txStep < 4 ? (
            <>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                disabled={isProcessing}
                className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
              >
                {t('cancel_btn')}
              </button>

              <button
                onClick={handleExecuteTransaction}
                disabled={!hasSufficientToken || isProcessing}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
                  hasSufficientToken && !isProcessing
                    ? 'bg-[#F59E0B] text-[#0A101F] hover:bg-[#FBBF24] cursor-pointer'
                    : 'bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'
                }`}
              >
                <Zap className="w-4 h-4" />
                {t('btn_confirm_swap_deposit')}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setTxStep(1);
                setIsCheckoutOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#0284C7] text-[#0A101F] hover:bg-[#0284C7]/90 transition-colors"
            >
              {t('close_btn')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
