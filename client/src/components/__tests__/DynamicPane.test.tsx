import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DynamicPane from '../DynamicPane';

describe('DynamicPane', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <DynamicPane isOpen={false} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders daily news summary when open', () => {
    render(<DynamicPane isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Daily News')).toBeInTheDocument();
    expect(screen.getByText('Summary & Chat')).toBeInTheDocument();
  });

  it('switches to chat view when chat button is clicked', () => {
    render(<DynamicPane isOpen={true} onClose={() => {}} />);
    
    const chatButton = screen.getByText('Chat about today\'s news');
    fireEvent.click(chatButton);
    
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Ask about today\'s news')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<DynamicPane isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalled();
  });
});
