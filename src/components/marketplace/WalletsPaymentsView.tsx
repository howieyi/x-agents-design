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
          <h1 className="font-display font-bold text-2xl tracking-tight">
            {t('wallets_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {t('wallets_subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FFC857] text-[#07111F] hover:bg-[#FFD479] transition-colors flex items-center gap-2 shadow-md"
          >
            <Coins className="w-4 h-4" />
            {t('acquire_yd')}
          </button>
          <button
            onClick={() => setIsLinkWalletModalOpen(true)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-2 ${
              isDark ? 'border-[#243550] bg-[#0C1728] hover:bg-[#111F34]' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <Plus className="w-4 h-4" />
            {t('link_new_wallet')}
          </button>
        </div>
      </div>

      {/* YD Balance & Protocol Overview Banner */}
      <div
        className={`p-6 rounded-2xl border transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 ${
          isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-gradient-to-r from-amber-50/50 to-white border-amber-200 shadow-xs'
        }`}
      >
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFC857]">
            Active Settlement Asset (ERC-20)
          </span>
          <div className="flex items-baseline gap-2">
            <h2 className="font-display font-bold text-3xl font-mono-tabular text-[#FFC857]">
              {ydBalance.toLocaleString()}
            </h2>
            <span className="text-sm font-semibold opacity-75">YD</span>
            <span className="text-xs text-slate-400 ml-2 font-mono-tabular">
              ≈ ${(ydBalance * 1.0).toLocaleString()} USD
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Current default payment account: <strong className={isDark ? 'text-slate-200' : 'text-slate-700'}>{activeWallet.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#07111F] border border-[#243550] text-xs font-mono-tabular text-center">
            <span className="text-[10px] text-slate-400 uppercase block">Settlement Chain</span>
            <span className="font-bold text-[#36E4DA]">Base Sepolia (84532)</span>
          </div>
          <div className="p-3 rounded-xl bg-[#07111F] border border-[#243550] text-xs font-mono-tabular text-center">
            <span className="text-[10px] text-slate-400 uppercase block">Escrow Contract</span>
            <span className="font-bold text-slate-300">0x99B3...1525A</span>
          </div>
        </div>
      </div>

      {/* Linked Wallets List */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-base tracking-tight flex items-center gap-2">
          <Wallet className="w-4 h-4 text-[#36E4DA]" />
          {t('connected_wallets')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {wallets.map((w) => {
            const isSelected = w.id === activeWallet.id;
            return (
              <div
                key={w.id}
                id={`wallet-card-${w.id}`}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? isDark
                      ? 'bg-[#0C1728] border-[#36E4DA]/60 shadow-md ring-1 ring-[#36E4DA]/30'
                      : 'bg-white border-sky-400 shadow-md ring-1 ring-sky-300'
                    : isDark
                    ? 'bg-[#0C1728] border-[#243550] hover:border-slate-600'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  {/* Top: Name, Provider badge, Verified */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-xs">{w.name}</h4>
                        {w.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-[#35D07F]" title="Ownership Verified" />
                        )}
                      </div>
                      <p className="font-mono text-[11px] text-slate-400 mt-0.5">{shorten(w.address)}</p>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-[#7568FF]/15 text-[#7568FF]">
                      {w.provider.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Token Balances Grid */}
                  <div
                    className={`p-3 rounded-xl border text-xs font-mono-tabular space-y-1.5 mb-3 ${
                      isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="text-slate-400">YD Token</span>
                      <span className="font-bold text-[#FFC857]">{w.balances.YD.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ETH</span>
                      <span className="font-semibold text-slate-200">{w.balances.ETH}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">USDC</span>
                      <span className="font-semibold text-slate-200">${w.balances.USDC.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Role Assignment Chips */}
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
                      {t('wallet_role_label')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(['payment', 'payout', 'identity', 'execution'] as const).map((r) => {
                        const hasRole = w.roles.includes(r);
                        return (
                          <button
                            key={r}
                            onClick={() => switchWalletRole(w.id, r)}
                            className={`text-[10px] px-2 py-1 rounded-md font-mono transition-colors ${
                              hasRole
                                ? 'bg-[#36E4DA]/20 text-[#36E4DA] border border-[#36E4DA]/40 font-semibold'
                                : isDark
                                ? 'bg-[#111F34] text-slate-500 border border-transparent hover:text-slate-300'
                                : 'bg-slate-100 text-slate-400 hover:text-slate-700'
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
                <div className="pt-3 border-t border-slate-700/20 flex items-center justify-between">
                  {isSelected ? (
                    <span className="text-xs font-semibold text-[#35D07F] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Active Payment Wallet
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveWalletId(w.id)}
                      className="text-xs text-[#36E4DA] hover:underline font-semibold"
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
        className={`p-5 rounded-2xl border transition-colors ${
          isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <h3 className="font-display font-semibold text-sm tracking-tight mb-4">
          {t('recent_transactions')}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="pb-3 font-medium">{t('tx_hash')}</th>
                <th className="pb-3 font-medium">{t('tx_type')}</th>
                <th className="pb-3 font-medium">{t('tx_amount')}</th>
                <th className="pb-3 font-medium">From / To</th>
                <th className="pb-3 font-medium">{t('tx_status')}</th>
                <th className="pb-3 font-medium text-right">{t('tx_time')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20 font-mono-tabular">
              {transactions.map((tx) => (
                <tr key={tx.id} className={isDark ? 'hover:bg-[#111F34]/30' : 'hover:bg-slate-50'}>
                  <td className="py-3 font-mono text-[11px] text-[#36E4DA]">
                    {shorten(tx.txHash)}
                  </td>
                  <td className="py-3 capitalize font-sans">{tx.type.replace('_', ' ')}</td>
                  <td className="py-3 font-bold text-[#FFC857]">{tx.amountYD.toLocaleString()} YD</td>
                  <td className="py-3 text-slate-400 font-mono text-[10px]">
                    {shorten(tx.fromAddress)} → {shorten(tx.toAddress)}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#35D07F]/15 text-[#35D07F]">
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-400 text-[11px]">
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
            className={`relative z-10 w-full max-w-md rounded-2xl border p-6 space-y-4 ${
              isDark ? 'bg-[#0A1424] border-[#243550] text-[#F4F7FB]' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-base">{t('link_new_wallet')}</h3>
              <button onClick={() => setIsLinkWalletModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Select wallet provider to sign ownership verification message (EIP-712 nonce proof):
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  showToast(t('toast_wallet_connected'), 'success');
                  setIsLinkWalletModalOpen(false);
                }}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                  isDark ? 'bg-[#07111F] border-[#243550] hover:bg-[#111F34]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>MetaMask Browser Extension</span>
                <span className="text-[#36E4DA]">Connect →</span>
              </button>
              <button
                onClick={() => {
                  showToast(t('toast_wallet_connected'), 'success');
                  setIsLinkWalletModalOpen(false);
                }}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                  isDark ? 'bg-[#07111F] border-[#243550] hover:bg-[#111F34]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>WalletConnect / Mobile App</span>
                <span className="text-[#36E4DA]">Connect →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
