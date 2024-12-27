import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import "./dialog.scss";
import Button, { ButtonProps } from "../Button/Button";

type DialogContextProps = {
  children: ReactNode;
};

type DialogInitialState = {
  close: () => void;
  open: () => void;
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
};

const DialogContext = createContext<DialogInitialState | undefined>(undefined);

function DialogProvider({ children }: DialogContextProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {});

  function open() {
    console.log("Modal opened");
    dialogRef.current?.showModal();
  }
  function close() {
    console.log("Modal closed");
    dialogRef.current?.close();
  }

  return (
    <DialogContext.Provider value={{ close, open, dialogRef }}>
      {children}
    </DialogContext.Provider>
  );
}
function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog context was used outside DialogProvider");
  }
  return context;
}

function Dialog({ children }: { children: ReactNode }) {
  return <DialogProvider>{children}</DialogProvider>;
}

function DialogTrigger({
  children,
  variant = "default",
  ...props
}: ButtonProps) {
  const { open } = useDialogContext();
  return (
    <Button onClick={() => open()} variant={variant} {...props}>
      {children}
    </Button>
  );
}

function DialogContent({ children }: { children: ReactNode }) {
  const { dialogRef } = useDialogContext();
  return (
    <dialog ref={dialogRef}>
      <div className="dialog-wrapper">{children}</div>
    </dialog>
  );
}

function DialogHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="dialog-header">
      <h2>{title}</h2>
      {description && <p className="dialog-desc">{description}</p>}
    </div>
  );
}

function DialogFooter({ children }: { children: ReactNode }) {
  return <footer className="dialog-footer">{children}</footer>;
}

function DialogButton({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>;
}
function DialogClose() {
  const { close } = useDialogContext();

  return (
    <Button variant="outlined" onClick={() => close()}>
      Close
    </Button>
  );
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Button = DialogButton;
Dialog.Close = DialogClose;

export { Dialog };
