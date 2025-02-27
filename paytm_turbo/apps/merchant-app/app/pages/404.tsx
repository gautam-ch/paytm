function ErrorPage() {
    return <div>Error occurred</div>;
  }
  
  // This prevents Next.js from statically optimizing this page
  ErrorPage.getInitialProps = () => {
    return {};
  };
  
  export default ErrorPage;