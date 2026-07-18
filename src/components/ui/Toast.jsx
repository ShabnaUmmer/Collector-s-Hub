import { FiCheck, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import './Toast.css';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const Icon = toast.type === 'success' ? FiCheck
    : toast.type === 'warning' ? FiAlertTriangle
    : FiInfo;

  return (
    <div className={`toast toast-${toast.type}`} key={toast.id}>
      <span className="toast-icon">
        <Icon size={12} />
      </span>
      {toast.message}
    </div>
  );
}
