import { useState } from 'react';
import Img from '../ui/Img';
import { FiChevronDown, FiTrash2, FiMove } from 'react-icons/fi';
import './CollectionItem.css';

export default function CollectionItem({ item, collectionKey, onRemove, moveTargets, onMove }) {
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleRemove = () => {
    if (confirmRemove) {
      onRemove();
    } else {
      setConfirmRemove(true);
      setTimeout(() => setConfirmRemove(false), 2500);
    }
  };

  return (
    <div className="collection-item">
      <div className="ci-image-wrap">
        <Img src={item.image} alt={item.title} className="ci-image" />
      </div>

      <div className="ci-body">
        <div className="ci-title">{item.title}</div>
        <div className="ci-meta">
          {item.category && <span className="ci-tag">{item.category}</span>}
          {item.condition && <span className="ci-condition">{item.condition}</span>}
        </div>
        <div className="ci-dates">
          Added {new Date(item.dateAdded).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          })}
        </div>
      </div>

      <div className="ci-value">
        <span className="ci-value-amount">${(item.estimatedValue || 0).toLocaleString()}</span>
        <span className="ci-value-label">est. value</span>
      </div>

      <div className="ci-actions">
        <div className="move-wrapper">
          <button className="ci-btn" onClick={() => setShowMoveMenu(m => !m)}>
            <FiMove size={13} />
            Move
            <FiChevronDown size={12} />
          </button>
          {showMoveMenu && (
            <div className="move-menu">
              {moveTargets.map(t => (
                <button
                  key={t.key}
                  className="move-option"
                  onClick={() => { onMove(t.key); setShowMoveMenu(false); }}
                >
                  Move to {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className={`ci-btn ci-remove-btn ${confirmRemove ? 'confirm' : ''}`}
          onClick={handleRemove}
        >
          <FiTrash2 size={13} />
          {confirmRemove ? 'Confirm?' : 'Remove'}
        </button>
      </div>
    </div>
  );
}
