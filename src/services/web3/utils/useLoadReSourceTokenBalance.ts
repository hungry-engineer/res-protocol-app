import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import { useWeb3Context } from "web3-react"
import { getSourceTokenContract } from "../contracts/sourceToken"

export const useLoadSourceTokenBalance = () => {
  const context = useWeb3Context()
  const [sourceBalance, setSourceBalance] = useState<BigNumber>()

  useEffect(() => {
    async function loadBalance() {
      if (context.account) {
        const provider = new ethers.providers.Web3Provider(context.library.provider)
        const signer = provider.getSigner()
        const contract = getSourceTokenContract(provider)
        const address = context.account
        const balance = await contract.connect(signer).balanceOf(address)
        setSourceBalance(balance)
      }
    }

    loadBalance()
  }, [context])

  return sourceBalance
}
