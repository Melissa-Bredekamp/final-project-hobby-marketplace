import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
  return (
    <div>
      <Header />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
