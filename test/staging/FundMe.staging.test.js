const { ethers, getNamedAccounts, network } = require('hardhat')
const { developmentChains } = require('../../helper-hardhat-config')
const { assert, expect } = require('chai')
const {
    isCallTrace,
} = require('hardhat/internal/hardhat-network/stack-traces/message-trace')

developmentChains.includes(network.name)
    ? describe.skip
    : describe('FundMe', async function () {
          let fundMe, deployer
          const sendValue = ethers.utils.parseEther('0.2')

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract('FundMe', deployer)
          })

          it('allows people to fund and withdraw', async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), '0')
          })
      })
