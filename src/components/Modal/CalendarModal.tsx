import React, { FC } from "react"
import { Modal } from "react-bootstrap"

interface IModalBasic {
  show?: boolean
  title?: string
  cancelTitle?: string
  handleTitle?: string
  close?: () => void
  handle?: () => void
  children: JSX.Element
}

export const ModalBasic: FC<IModalBasic> = ({
  show,
  title,
  cancelTitle = "Close",
  handleTitle = "Confirm",
  handle,
  close,
  children,
}) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <h5>{title}</h5>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <div className="text-right">
          <button className="btn btn-outline-success mx-3" onClick={handle}>
            {handleTitle}
          </button>
          <button className="btn btn-outline-light" style={{ color: "#333333" }} onClick={close}>
            {cancelTitle}
          </button>
        </div>
      </Modal.Footer>
      <div id="date-popup"></div>
    </Modal>
  )
}
