import React, { useState } from 'react';
import { X, Share2, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

interface ConnectChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChannelConnected: (channelName: string) => void;
}

export const ConnectChannelModal: React.FC<ConnectChannelModalProps> = ({
  isOpen,
  onClose,
  onChannelConnected,
}) => {
  const [connectingId, setConnectingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const channelsList = [
    {
      id: 'meta',
      name: 'Meta Ads Manager (Facebook & IG)',
      status: 'Connected',
      iconColor: 'bg-blue-600',
    },
    {
      id: 'google',
      name: 'Google Ads & Merchant Center',
      status: 'Connected',
      iconColor: 'bg-rose-500',
    },
    {
      id: 'tiktok',
      name: 'TikTok Ads for Business',
      status: 'Ready to Connect',
      iconColor: 'bg-slate-900',
    },
    {
      id: 'pinterest',
      name: 'Pinterest Promoted Pins',
      status: 'Ready to Connect',
      iconColor: 'bg-red-600',
    },
    {
      id: 'snapchat',
      name: 'Snapchat Campaign Manager',
      status: 'Ready to Connect',
      iconColor: 'bg-amber-400',
    },
  ];

  const handleConnect = (id: string, name: string) => {
    setConnectingId(id);
    setTimeout(() => {
      setConnectingId(null);
      onChannelConnected(name);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#180E34] to-[#2A134D] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 text-white">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Connect Ad Network</h3>
              <p className="text-xs text-purple-200">
                Direct OAuth 2.0 conversion sync
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-purple-300 hover:text-white rounded-lg hover:bg-purple-900/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Channels */}
        <div className="p-5 space-y-2.5 text-xs">
          {channelsList.map((ch) => {
            const isConnected = ch.status === 'Connected';
            const isConnecting = connectingId === ch.id;

            return (
              <div
                key={ch.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-purple-50/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg ${ch.iconColor} text-white flex items-center justify-center font-bold text-xs shadow-xs`}
                  >
                    {ch.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{ch.name}</span>
                    <span
                      className={`text-[10px] font-semibold ${
                        isConnected ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    >
                      {isConnected ? '✓ Synced & Live' : 'Not Connected'}
                    </span>
                  </div>
                </div>

                {isConnected ? (
                  <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-lg">
                    Configured
                  </span>
                ) : (
                  <button
                    disabled={isConnecting}
                    onClick={() => handleConnect(ch.id, ch.name)}
                    className="px-3 py-1 text-[11px] font-bold text-purple-700 hover:text-white bg-purple-50 hover:bg-purple-600 rounded-lg border border-purple-200 transition-colors"
                  >
                    {isConnecting ? 'Linking...' : 'Connect'}
                  </button>
                )}
              </div>
            );
          })}

          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200/60 flex items-center gap-2 text-[11px] text-purple-800 mt-2">
            <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
            <span>
              All API keys are encrypted at rest with verified conversion webhooks.
            </span>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
