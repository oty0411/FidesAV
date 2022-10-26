import Separator from 'components/atoms/Separator'
import Box from 'components/layout/Box'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'

interface LayoutProps {
  /**
   * ユーザータイプ
   */
  userType?: 'actor' | 'maker'
  /**
   * children
   */
  children: React.ReactNode
}

const Layout = ({ userType, children }: LayoutProps) => {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        height: 'auto !important',
        minHeight: '100%',
      }}
    >
      <Header userType={userType} />
      <main
        style={{
          //background: `url(${'https://beiz.jp/images_T/white/white_00036.jpg'})`,
          //background: `url(${'https://beiz.jp/images_P/light/light_00040.jpg'})`, // 白系きらきら
          // background: `url(${'https://beiz.jp/images_T/white/white_00007.jpg'})`, // 白系テクスチャ
          //background: `url(${'https://beiz.jp/images_T/twinkle/twinkle_00001.jpg'})`, // ビーズきらきら
          backgroundSize: 'cover',
          paddingTop: '55px',
          paddingBottom: '75px',
          width: '100%',
          height: 'auto',
        }}
      >
        {children}
        {/* <Box height={'300px'} /> */}
      </main>
      {/* <Separator />
      <Box
        width="100%"
        padding={0}
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '75px',
          // top: "100vh",
          // position: "sticky",
          //bottom: 0
          color: '#ffffff',
          backgroundColor: '#000000',
        }}
      >
        <Footer />
      </Box> */}
    </div>
  )
}

export default Layout
