function Custom500() {
  return <div>500 - Server Error</div>;
}

// This prevents Next.js from statically optimizing this page
Custom500.getInitialProps = () => {
  return {};
};

export default Custom500;