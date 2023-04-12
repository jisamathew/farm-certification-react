import { useNavigate } from "react-router-dom";
export default function RedirectPage(){

    const navigate = useNavigate();

    return navigate(`/`)

}