import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  Coins,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  X
} from 'lucide-react';

export const WalletsPaymentsView: React.FC = () => {
  const {
    t,
    wallets,
    activeWallet,
    setActiveWalletId,
    switchWalletRole,
    ydBalance,
    setIsCheckoutOpen,
    transactions,
    showToast,
    theme,
    locale
  } = useApp();

  const isDark = theme === 'dark';
  const [isLinkWalletModalOpen, setIsLinkWalletModalOpen] = useState(false);

  const shorten = (addr: string) => `${addr.substring(0, 8)}...${addr.substring(addr.length - 6)}`;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
            {t('wallets_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1">
            {t('wallets_subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white transition-all flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <Coins className="w-4 h-4" />
            {t('acquire_yd')}
          </button>
          <button
            onClick={() => setIsLinkWalletModalOpen(true)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'border-purple-900/40 bg-[#101A2E] hover:bg-purple-950/40 text-slate-200'
                : 'border-purple-100 bg-white hover:bg-purple-50 text-slate-800 shadow-sm'
            }`}
          >
            <Plus className="w-4 h-4 text-purple-500" />
            {t('link_new_wallet')}
          </button>
        </div>
      </div>

      {/* YD Balance & Protocol Overview Banner */}
      <div
        className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
          isDark
            ? 'bg-gradient-to-r from-[#101A2E] via-[#1D2133] to-[#101A2E] border-purple-900/50 shadow-lg shadow-purple-950/20'
            : 'bg-gradient-to-r from-purple-50/80 via-white to-amber-50/40 border-purple-100 shadow-sm'
        }`}
      >
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5" />
            Active Settlement Asset (ERC-20)
          </span>
          <div className="flex items-baseline gap-2">
            <h2 className="font-display font-bold text-3xl md:text-4xl font-mono-tabular text-amber-600 dark:text-amber-400">
              {ydBalance.toLocaleString()}
            </h2>
            <span className="text-base font-bold text-slate-700 dark:text-slate-300">YD</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-mono">
              ≈ ${(ydBalance * 1.0).toLocaleString()} USD
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Current default payment account:{' '}
            <strong className="text-purple-600 dark:text-purple-300 font-semibold">{activeWallet.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <div className={`p-3.5 rounded-2xl border text-xs text-center min-w-[140px] ${
            isDark ? 'bg-[#0D1526] border-purple-900/40' : 'bg-white border-purple-100 shadow-xs'
          }`}>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-medium block">Settlement Chain</span>
            <span className="font-bold text-purple-600 dark:text-purple-400 mt-0.5 block">Base Sepolia (84532)</span>
          </div>
          <div className={`p-3.5 rounded-2xl border text-xs text-center min-w-[140px] ${
            isDark ? 'bg-[#0D1526] border-purple-900/40' : 'bg-white border-purple-100 shadow-xs'
          }`}>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-medium block">Escrow Contract</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">0x99B3...1525A</span>
          </div>
        </div>
      </div>

      {/* Connected Wallets List */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Wallet className="w-4 h-4 text-purple-500" />
          {t('connected_wallets')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {wallets.map((w) => {
            const isSelected = w.id === activeWallet.id;
            return (
              <div
                key={w.id}
                id={`wallet-card-${w.id}`}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? isDark
                      ? 'bg-[#101A2E] border-purple-500 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500/40'
                      : 'bg-white border-purple-400 shadow-md ring-2 ring-purple-400/30'
                    : isDark
                    ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-700'
                    : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
                }`}
              >
                <div>
                  {/* Top: Name, Provider badge, Verified */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{w.name}</h4>
                        {w.verified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-500" title="Ownership Verified" />
                        )}
                      </div>
                      <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{shorten(w.address)}</p>
                    </div>

                    <span className="text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                      {w.provider.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Token Balances Grid */}
                  <div
                    className={`p-3.5 rounded-2xl border text-xs font-mono space-y-1.5 mb-3.5 ${
                      isDark ? 'bg-[#0D1526] border-purple-900/40' : 'bg-purple-50/50 border-purple-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400 font-sans">YD Token</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">{w.balances.YD.toLocaleString()} YD</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400 font-sans">ETH</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{w.balances.ETH} ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400 font-sans">USDC</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">${w.balances.USDC.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Role Assignment Chips */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase block mb-1.5 font-semibold">
                      {t('wallet_role_label')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(['payment', 'payout', 'identity', 'execution'] as const).map((r) => {
                        const hasRole = w.roles.includes(r);
                        return (
                          <button
                            key={r}
                            onClick={() => switchWalletRole(w.id, r)}
                            className={`text-[11px] px-2.5 py-1 rounded-xl font-mono transition-all cursor-pointer ${
                              hasRole
                                ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold shadow-xs'
                                : isDark
                                ? 'bg-[#0D1526] text-slate-400 border border-purple-900/40 hover:text-white'
                                : 'bg-purple-50 text-slate-600 border border-purple-100 hover:text-purple-700'
                            }`}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Switch Active Wallet Action */}
                <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between">
                  {isSelected ? (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Active Payment Wallet
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveWalletId(w.id)}
                      className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-bold cursor-pointer"
                    >
                      Set as Primary Payment →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction & Settlement Ledger */}
      <div
        className={`p-5 rounded-3xl border transition-colors shadow-sm ${
          isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100'
        }`}
      >
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white tracking-tight mb-4">
          {t('recent_transactions')}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-purple-900/40 text-slate-400' : 'border-purple-100 text-slate-600'}`}>
                <th className="pb-3 font-semibold">{t('tx_hash')}</th>
                <th className="pb-3 font-semibold">{t('tx_type')}</th>
                <th className="pb-3 font-semibold">{t('tx_amount')}</th>
                <th className="pb-3 font-semibold">From / To</th>
                <th className="pb-3 font-semibold">{t('tx_status')}</th>
                <th className="pb-3 font-semibold text-right">{t('tx_time')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100 dark:divide-purple-900/30 font-mono">
              {transactions.map((tx) => (
                <tr key={tx.id} className={isDark ? 'hover:bg-purple-950/20' : 'hover:bg-purple-50/40'}>
                  <td className="py-3 font-bold text-purple-600 dark:text-purple-400 text-[11px]">
                    {shorten(tx.txHash)}
                  </td>
                  <td className="py-3 capitalize font-sans text-slate-800 dark:text-slate-200">{tx.type.replace('_', ' ')}</td>
                  <td className="py-3 font-bold text-amber-600 dark:text-amber-400">{tx.amountYD.toLocaleString()} YD</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400 text-[11px]">
                    {shorten(tx.fromAddress)} → {shorten(tx.toAddress)}
                  </td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-sans">
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-500 dark:text-slate-400 text-[11px]">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Link Wallet Modal */}
      {isLinkWalletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsLinkWalletModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />
          <div
            className={`relative z-10 w-full max-w-md rounded-3xl border p-6 space-y-4 shadow-2xl ${
              isDark ? 'bg-[#101A2E] border-purple-900/40 text-white' : 'bg-white border-purple-100 text-slate-900'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-base">{t('link_new_wallet')}</h3>
              <button onClick={() => setIsLinkWalletModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Select wallet provider to sign ownership verification message (EIP-712 nonce proof):
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  showToast(t('toast_wallet_connected'), 'success');
                  setIsLinkWalletModalOpen(false);
                }}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#0D1526] border-purple-900/40 hover:border-purple-500'
                    : 'bg-purple-50/50 border-purple-100 hover:border-purple-300'
                }`}
              >
                <span className="text-slate-900 dark:text-white">MetaMask Browser Extension</span>
                <span className="text-purple-600 dark:text-purple-400">Connect →</span>
              </button>
              <button
                onClick={() => {
                  showToast(t('toast_wallet_connected'), 'success');
                  setIsLinkWalletModalOpen(false);
                }}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#0D1526] border-purple-900/40 hover:border-purple-500'
                    : 'bg-purple-50/50 border-purple-100 hover:border-purple-300'
                }`}
              >
                <span className="text-slate-900 dark:text-white">WalletConnect / Mobile App</span>
                <span className="text-purple-600 dark:text-purple-400">Connect →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
