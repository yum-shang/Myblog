import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";
import cn from "classnames";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  if (!preview) return null;

  return (
    <div className="border-b bg-morandi-paper border-morandi-card-border">
      <Container>
        <div className="py-2 text-center text-sm text-morandi-ink-light">
          This page is a preview.{" "}
          <a
            href="/api/exit-preview"
            className="underline hover:text-morandi-sage-deep duration-200 transition-colors"
          >
            Click here
          </a>{" "}
          to exit preview mode.
        </div>
      </Container>
    </div>
  );
};

export default Alert;
