import Link from 'next/link';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/">Step 1</Link>
      <Link href="/steptwo">Step 2</Link>
      <Link href="/stepthree">Step 3</Link>
    </NavStyles>
  );
}
