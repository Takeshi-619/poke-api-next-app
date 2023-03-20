import Link from "next/link";
import { MouseParallax } from "react-just-parallax";

type Props = {
  href: string;
  text: string;
};

function Btn({ href, text }: Props) {
  return (
    <MouseParallax>
      <div className="btn-content">
        <Link href={href}>{text}</Link>
      </div>
    </MouseParallax>
  );
}

export default Btn;
