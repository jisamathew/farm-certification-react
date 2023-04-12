import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
     <div class="page-404-area bg-1">
  
  	{/* <!--header-area end--> */}
	
	{/* <!--404-area start--> */}
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<div class="page-404-msg">
					<h1>Opps !</h1>
					<p> Sorry, an unexpected error has occurred or Page not found! Please go back to <a href="#">Home Page</a></p>
                    <p>
        <i>{error.statusText || error.message}</i>
      </p>
				</div>
			</div>
		</div>
	</div>
	</div>
     
     
    </div>
  );
}