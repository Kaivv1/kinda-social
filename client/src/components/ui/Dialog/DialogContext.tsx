import {
  ComponentPropsWithoutRef,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import "./dialog.scss";
import Button, { ButtonProps } from "../Button/Button";

type DialogContextProps = {
  children: ReactNode;
};

const DialogContext = createContext<
  | {
      isOpen: boolean;
      getParentOpen: (open: boolean) => void;
    }
  | undefined
>(undefined);

function DialogProvider({ children }: DialogContextProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getParentOpen = (open: boolean) => setIsOpen(open);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <DialogContext.Provider value={{ isOpen, getParentOpen }}>
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
  open,
  children,
  variant = "default",
  ...props
}: ButtonProps & { open: boolean }) {
  const { getParentOpen } = useDialogContext();

  useEffect(() => {
    getParentOpen(open);
  }, [open, getParentOpen]);

  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
}

function DialogContent({ children }: { children: ReactNode }) {
  const { isOpen } = useDialogContext();
  return (
    <dialog open={isOpen}>
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
function DialogClose({ ...props }: ComponentPropsWithoutRef<"button">) {
  return (
    <Button variant="outlined" {...props}>
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
