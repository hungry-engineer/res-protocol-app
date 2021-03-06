import { ethers } from "ethers"
import { showMetaMaskNotFoundToast } from "../../../components/toast/customToasts"
import { config } from "../../../config"
import { CONTRACTS } from "../constants"

export const requestAddNetwork = async () => {
  const _window = window as any

  if (!_window.ethereum) {
    return showMetaMaskNotFoundToast()
  }

  await _window.ethereum?.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: ethers.utils.parseUnits(config.NETWORK_CHAIN_ID.toString(), "wei")._hex,
        chainName: config.NETWORK_NAME,
        nativeCurrency: {
          name: config.NETWORK_CURRENCY_NAME,
          symbol: config.NETWORK_CURRENCY_SYMBOL,
          decimals: 18,
        },
        rpcUrls: [config.NETWORK_URL],
        blockExplorerUrls: [config.NETWORK_EXPLORER_URL],
        iconUrls: ["future"],
      },
    ],
  })
}

export const requestAddToken = async () => {
  const _window = window as any

  if (!_window.ethereum) {
    return showMetaMaskNotFoundToast()
  }

  await _window.ethereum?.request({
    method: "wallet_watchAsset",

    params: {
      type: "ERC20",
      options: {
        address: CONTRACTS.SourceToken,
        symbol: "SOURCE",
        decimals: 18,
        image: `${window.location.origin}/favicon.ico`,
      },
    },
  })
}
