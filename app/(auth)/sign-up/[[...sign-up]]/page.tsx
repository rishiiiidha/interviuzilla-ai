import { SignUp } from "@clerk/nextjs";
import styles from "../../Auth.module.css";
export default function Page() {
  return (
    <div className={styles.background}>
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: {
              fontSize: 14,
              textTransform: "none",
              backgroundColor: "#49247A",
              "&:hover, &:focus, &:active": {
                backgroundColor: "#49247F",
              },
            },
          },
        }}
      />
    </div>
  );
}
