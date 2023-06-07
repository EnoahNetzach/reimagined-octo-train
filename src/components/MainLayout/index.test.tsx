import { createRenderer } from 'react-test-renderer/shallow'
import MainLayout from '.'

jest.mock(
  '~/components/Characters',
  () =>
    function Characters() {
      return <></>
    },
)

describe('MainLayout', () => {
  it('mounts', () => {
    const renderer = createRenderer()
    renderer.render(<MainLayout />)
    expect(renderer.getRenderOutput()).toMatchSnapshot()
  })
})
