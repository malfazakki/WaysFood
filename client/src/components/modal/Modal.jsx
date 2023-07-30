/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useModal } from "../../context/ModalContext";

export default function Modal({ refetch }) {
  const { showModal, modalContent, closeModal } = useModal();

  if (!showModal) return null;

  function handleClickModal() {
    closeModal();
    if (refetch) return refetch();
  }

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto transition-opacity">
      <div className="fixed inset-0 w-full h-full bg-black opacity-50 blur-sm" onClick={handleClickModal}></div>
      <div className="flex items-center h-full">{modalContent}</div>
    </div>
  );
}
