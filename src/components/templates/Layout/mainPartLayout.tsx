import Link from 'next/link'
import React from 'react'
import BreadcrumbItem from 'components/atoms/BreadcrumbItem'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Breadcrumb from 'components/molecules/Breadcrumb'

interface MainPartLayoutProps {
  children: React.ReactNode
}

const MainPartLayout = ({ children }: MainPartLayoutProps) => {
  return (
    <>
      <Box width="100%">
        <Flex>
          <Box width="90%">
            <Flex flexDirection={'column'}>{children}</Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default MainPartLayout
