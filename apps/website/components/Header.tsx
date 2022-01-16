import { Popover } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import Link from 'next/link'

import useWeb3 from '../hooks/useWeb3'

export default function Header() {
  const { authenticate, isAuthenticated, truncatedWalletAddress } = useWeb3()

  const handleLogin = async () => {
    authenticate({
      // provider: 'walletconnect',
      chainId: parseInt(process.env.NEXT_PUBLIC_ETH_CHAIN_ID),
    })
  }

  return (
    <Popover className="relative bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1 font-serif text-xl">
            <Link href="/">
              <a>0xPhotos</a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="hidden md:flex items-center justify-end md:flex-grow lg:w-0 space-x-5">
            <Link href="/browse">
              <a className="flex space-x-2 items-center border-2 border-transparent hover:border-gray-500 px-3  py-1 rounded-full whitespace-nowrap">
                Browse
              </a>
            </Link>

            <Link href="/live">
              <a className="flex space-x-2 items-center border-2 border-transparent hover:border-gray-500 px-3  py-1 rounded-full whitespace-nowrap">
                Live Events
              </a>
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/mint">
                  <a className="flex space-x-2 items-center border-2 border-transparent hover:border-gray-500 px-3 py-1 rounded-full whitespace-nowrap">
                    Upload NFT
                  </a>
                </Link>

                <Link href="/dashboard">
                  <a className="flex space-x-2 items-center border-2 cursor-pointer hover:bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap">
                    <img
                      alt={truncatedWalletAddress}
                      src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy"
                      className="w-10 h-10 rounded-full"
                    />

                    <span className="w-28 ">{truncatedWalletAddress}</span>
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/contributors">
                  <a className="flex space-x-2 items-center border-2 border-transparent hover:border-gray-500 px-3  py-1 rounded-full whitespace-nowrap">
                    Photographers
                  </a>
                </Link>

                <a
                  className="flex space-x-2 items-center border-2 bg-white text-black cursor-pointer hover:bg-gray-300 px-3 py-1 rounded-full whitespace-nowrap"
                  onClick={handleLogin}
                >
                  Connect Wallet
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition> */}
    </Popover>
  )
}
