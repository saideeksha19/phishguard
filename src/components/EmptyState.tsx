import React from 'react';
import { ShieldAlert, Terminal, FileSearch, Inbox, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  id?: string;
  icon?: 'shield' | 'terminal' | 'search' | 'inbox';
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  badgeText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  id = 'empty-state-container',
  icon = 'shield',
  title,
  description,
  actionText,
  onAction,
  badgeText
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'terminal':
        return <Terminal className="w-7 h-7 text-blue-700" />;
      case 'search':
        return <FileSearch className="w-7 h-7 text-blue-700" />;
      case 'inbox':
        return <Inbox className="w-7 h-7 text-blue-700" />;
      default:
        return <ShieldAlert className="w-7 h-7 text-blue-700" />;
    }
  };

  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border border-slate-200 bg-white shadow-sm"
    >
      <div className="mb-4 flex items-center justify-center w-14 h-14 bg-slate-100 border border-slate-200 shadow-xs">
        {getIcon()}
      </div>

      {badgeText && (
        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200 mb-2.5">
          {badgeText}
        </span>
      )}

      <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed font-sans">
        {description}
      </p>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs font-sans transition-all shadow-xs"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

