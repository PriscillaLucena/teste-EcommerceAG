import "../Styles/Carousel.css"
import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState } from "react";
import "~slick-carousel/slick/slick.css"; 
import "~slick-carousel/slick/slick-theme.css";

function Carousel() {

    const [data, setData] = useState([]);
    const dados = !data ? data : "carregando"

    useEffect(() => {
        axios.get("https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json")
            .then((response) => {
                setData(response.data.products)
            })
            .catch((error) => console.log(error))
    }, [])

    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        centerMode: false,
        variableWidth: true,
        adaptiveHeight: true,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <div>
            <Slider {...settings}>
                {data && data.map((item) => {
                    return <div className="box-carousel" key={item.id}>
                        <div className="box-informacoes-carousel">
                            <div className="image-carousel">
                                <img src={item.photo} alt={item.productName} />
                            </div>
                            <div className="descricao-produto">{item.descriptionShort}</div>
                            <div className="preco-antigo">R${((item.price * 0.1) + item.price).toFixed(2)}</div>
                            <div className="preco-novo">R${item.price.toFixed(2)}</div>
                            <div className="parcelamento">ou 2x de R$ {item.price / 2} sem juros</div>
                            <div className="frete-gratis">Frete grátis</div>
                            {/* <button className="botao-carousel" onClick={() => setModalVisible(true)}>COMPRAR</button>
                                {isModalVisible ? <Modal /> : null} */}
                        </div>
                    </div>
                })}
            </Slider>
        </div>
    )
}
export default Carousel;