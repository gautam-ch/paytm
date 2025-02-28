function Custom404() {
  return <div>404 - Page Not Found</div>;
}

// This prevents Next.js from statically optimizing this page
Custom404.getInitialProps = () => {
  return {};
};

export default Custom404;