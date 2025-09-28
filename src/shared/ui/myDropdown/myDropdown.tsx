import { type ReactNode, useState, useRef, useEffect } from "react";
import { Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./myDropdown.module.scss";

type MyDropdownProps = {
  triggerText?: string;
  content: ReactNode;
  icon?: ReactNode;
};

export const MyDropdown = ({ triggerText, content, icon }: MyDropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`${styles["dropdown-widget"]}`} ref={containerRef}>
      <Button
        type="primary"
        icon={icon || <UserOutlined />}
        onClick={toggleOpen}
        className={styles["dropdown-widget__trigger"]}
      >
        {triggerText}
      </Button>

      {open && (
        <Card
          className={styles["dropdown-widget__content"]}
          size="small"
          type="inner"
          onClick={e => e.stopPropagation()}
        >
          {content}
        </Card>
      )}
    </div>
  );
};
