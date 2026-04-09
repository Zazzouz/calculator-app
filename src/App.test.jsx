import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Calculator History', () => {
  it('renders the calculator and records 2 + 3 = 5 in history', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Click buttons: 2, +, 3, =
    await user.click(screen.getByTestId('num-2'))
    await user.click(screen.getByTestId('op-add'))
    await user.click(screen.getByTestId('num-3'))
    await user.click(screen.getByTestId('equals'))

    // Assert display shows "5"
    expect(screen.getByTestId('display')).toHaveTextContent('5')

    // Assert History panel contains an entry like "2 + 3 = 5"
    const historyItems = screen.getAllByTestId('history-item')
    expect(historyItems).toHaveLength(1)
    expect(historyItems[0]).toHaveTextContent('2 + 3')
    expect(historyItems[0]).toHaveTextContent('= 5')
  })

  it('shows both calculations in history with newest first', async () => {
    const user = userEvent.setup()
    render(<App />)

    // First calculation: 2 + 3 = 5
    await user.click(screen.getByTestId('num-2'))
    await user.click(screen.getByTestId('op-add'))
    await user.click(screen.getByTestId('num-3'))
    await user.click(screen.getByTestId('equals'))

    // Second calculation: 10 - 4 = 6 (clear first to reset display)
    await user.click(screen.getByTestId('clear'))
    await user.click(screen.getByTestId('num-1'))
    await user.click(screen.getByTestId('num-0'))
    await user.click(screen.getByTestId('op-subtract'))
    await user.click(screen.getByTestId('num-4'))
    await user.click(screen.getByTestId('equals'))

    // Assert display shows "6"
    expect(screen.getByTestId('display')).toHaveTextContent('6')

    // Assert both entries appear in order (newest first)
    const historyItems = screen.getAllByTestId('history-item')
    expect(historyItems).toHaveLength(2)

    // First item (newest): 10 − 4 = 6 (UI uses unicode minus −)
    expect(historyItems[0]).toHaveTextContent('10')
    expect(historyItems[0]).toHaveTextContent('4')
    expect(historyItems[0]).toHaveTextContent('= 6')

    // Second item (older): 2 + 3 = 5
    expect(historyItems[1]).toHaveTextContent('2 + 3')
    expect(historyItems[1]).toHaveTextContent('= 5')
  })
})
