import styled from 'styled-components'
import ScaleImage from 'components/atoms/ScaleImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

interface CardProps {
  // カードタイトル
  title: string
  // 画像URL
  imageUrl: string
  // 作品URL
  url: string
}

// カードのコンテナ
const CardContainer = styled.div`
  position: relative;
`

// カード画像のコンテナ
const CardImageContainer = styled.div`
  z-index: 99;
`

// カードの情報
const CardInfo = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 0px;
  left: 0px;
  text-align: center;
`

/**
 * カード
 */
const Card = ({ title, imageUrl, url }: CardProps) => {
  const profileImageSizeNumber = 360
  const { size, imgSize } = {
    size: { base: '140px', md: '240px' },
    imgSize: 240,
  }

  return (
    <>
      <CardContainer>
        <CardImageContainer>
          <ScaleImage
            src={imageUrl}
            width={imgSize ?? 240}
            height={imgSize ?? 240}
            containerWidth={size}
            containerHeight={size}
            objectFit="cover"
          />
        </CardImageContainer>
        <CardInfo>
          <Box>
            <Flex justifyContent={'center'}>
              <Text
                as="h2"
                fontSize={{ base: 'small', md: 'medium' }}
                letterSpacing={{ base: 2, md: 3 }}
                lineHeight={{ base: '16px', md: '32px' }}
                backgroundColor="rgba(255,255,255,0.5)"
                color="#333333"
                minWidth={size}
                margin={0}
              >
                {title}
              </Text>
            </Flex>
          </Box>
        </CardInfo>
      </CardContainer>
    </>
  )
}

export default Card
