import { createRenderer } from 'react-test-renderer/shallow'
import ErrorPage from '.'

describe('ErrorPage', () => {
  it('mounts', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementationOnce(jest.fn())

    const renderer = createRenderer()
    renderer.render(<ErrorPage />)
    expect(renderer.getRenderOutput()).toMatchSnapshot()

    expect(consoleError).toHaveBeenCalledWith(expect.any(Error))
  })
})
