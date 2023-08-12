import Link from 'next/link';

const Header = (): JSX.Element => {
  return (
    <div className='flex w-[100%] space-x-3 mb-10'>
      <div>
        <Link href='/'>Home</Link>
      </div>
      <div>
        <Link href='/generate'>Générer</Link>
      </div>
      <div>
        <Link href='/training'>S’entraîner</Link>
      </div>
      <div>
        <Link href='/stats'>Suivi et statistiques</Link>
      </div>
    </div>
  );
};
export default Header;
