import { Flex, HStack, StackProps } from "@chakra-ui/layout"
import { useWeb3Context } from "web3-react"
import Button from "./Button"
import AddressInfo from "./wallet/AddressInfo"
import useConnectWallet from "./wallet/useConnectWallet"
import { Image } from "@chakra-ui/react"
import { gradients } from "../theme/foundations/colors"
import { useEffectOnce } from "react-use"
import { RusdGlyphGradient } from "./glyph/RusdGlyph"
import { useHistory } from "react-router"
import WalletInfo from "./wallet/WalletInfo"

const metaMaskIcon = "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"

export const Header = () => {
  const history = useHistory()
  const context = useWeb3Context()
  const connectWallet = useConnectWallet()

  useEffectOnce(() => {
    if (!context.active) connectWallet()
  })

  return (
    <Flex justifyContent="space-between" {...containerStyles}>
      <RusdGlyphGradient
        boxSize="36px"
        onClick={() => history.push("/")}
        _hover={{ cursor: "pointer" }}
      />
      <HStack align="center" spacing={6}>
        {context.library && (
          <>
            <WalletInfo />
            <AddressInfo />
          </>
        )}
        {!context.library && (
          <Button
            size="md"
            onClick={async () => await connectWallet()}
            background={gradients.primary}
            justifyContent="space-between"
            rightIcon={<Image width="2em" src={metaMaskIcon} />}
          >
            Connect Wallet
          </Button>
        )}
      </HStack>
    </Flex>
  )
}

export const headerHeight = 51

const containerStyles: StackProps = {
  px: { base: 4, md: 6 },
  py: { base: 2, md: 3 },
  justify: "space-between",
  alignItems: "center",
  borderBottom: "solid 1px",
  borderColor: "gray.300",
  bgColor: "white !important",
  height: headerHeight,
  position: "sticky",
  top: 0,
  w: "100vw",
  zIndex: 1,
}

export default Header
