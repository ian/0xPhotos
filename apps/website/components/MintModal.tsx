import { Modal, ModalBody, SIZE, ROLE } from 'baseui/modal'

import { ProgressSteps, Step } from 'baseui/progress-steps'
import Link from 'next/link'

const STEPS = {
  ipfs: 0,
  stream: 1,
  mint: 2,
  done: 3,
}

export default function MintModal(props) {
  const { step, isOpen, onClose } = props
  const current = STEPS[step]

  console.log({ current, step })

  return (
    <Modal
      onClose={onClose}
      closeable={false}
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: ({ $theme }) => ({
            borderRadius: 0,
            padding: 0,
          }),
        },
      }}
    >
      <ModalBody>
        <ProgressSteps current={current}>
          <Step title="Uploading Image">
            This can take anywhere from 10 to 30 seconds.
          </Step>

          <Step title="Generating Income Stream">
            We&apos;re generating the ability for you to receive income from
            your work.
            <br />
            <br />
            You&apos;ll be asked to approved this action through your wallet.
          </Step>

          <Step title="Minting your NFT">
            We will generate a unique NFT which you are the owner and media
            buyers can rent from you.
          </Step>

          <Step title={step === 'done' ? 'Your NFT is published!' : 'Done'}>
            <Link href="/dashboard">
              <a className="bg-black text-white p-4">Go to your dashboard</a>
            </Link>
          </Step>
        </ProgressSteps>
      </ModalBody>
    </Modal>
  )
}
