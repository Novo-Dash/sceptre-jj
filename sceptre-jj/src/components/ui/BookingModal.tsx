import { Dialog } from '@base-ui-components/react/dialog'
import type { ProgramId } from '@/types'

interface BookingModalProps {
  isOpen: boolean
  defaultProgram: ProgramId | ''
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden max-h-[90dvh] overflow-y-auto">

            {/* Header */}
            <div className="relative px-8 pt-8 pb-7 bg-[var(--color-bg-dark)]">
              <Dialog.Close
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Dialog.Close>

              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-2">
                Free Trial Class
              </p>
              <Dialog.Title className="text-[1.75rem] font-black text-white leading-none tracking-tight mb-2">
                Start Your Journey
              </Dialog.Title>
              <Dialog.Description className="text-sm text-white/50 leading-relaxed">
                Step on the mat for free — no contracts, no commitment.
              </Dialog.Description>
            </div>

            {/* Body */}
            <div className="p-6">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/eckOyKN6DCMTedCvbwAI"
                style={{ width: '100%', height: '738px', border: 'none', borderRadius: '16px' }}
                id="inline-eckOyKN6DCMTedCvbwAI"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Form Novo Dash"
                data-height="738"
                data-layout-iframe-id="inline-eckOyKN6DCMTedCvbwAI"
                data-form-id="eckOyKN6DCMTedCvbwAI"
                title="Form Novo Dash"
              />
            </div>

          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
