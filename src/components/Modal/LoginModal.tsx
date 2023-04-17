import React, { FC } from "react"
import { Modal } from "react-bootstrap"

interface ILoginBasic {
  show?: boolean
  cancelTitle?: string
  close?: () => void
  children: JSX.Element
}

export const LoginModal: FC<ILoginBasic> = ({ show, cancelTitle = "Close", close, children }) => {
  return (
    <Modal show={show} centered>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <div className="text-right">
          <button className="btn btn-outline-light" onClick={close} style={{ color: "#333333" }}>
            {cancelTitle}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
