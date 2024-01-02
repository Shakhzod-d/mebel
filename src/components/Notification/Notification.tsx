import React, { useEffect, useState } from "react";
import "./Notification.scss";
import { useAppDispatch } from "../../store/store";
import { setEmptyNotification } from "../../store/mebelsSlice";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const [isEntering, setIsEntering] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
      dispatch(setEmptyNotification());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (!isEntering) {
      onClose();
    }
  };

  return (
    <div
      className={`notification ${type} ${isEntering ? "enter" : "exit"}`}
      onClick={onClose}
      onTransitionEnd={handleTransitionEnd}
    >
      {message}
    </div>
  );
};

export default Notification;
