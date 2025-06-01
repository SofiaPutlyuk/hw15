import React from "react";
import './giflist.css'
class GifList extends React.Component {

    render() {
        return (
            <ul>
                {this.props.gif.map((elem, index) => (
                    <li key={index}>
                        <img src={elem.images.fixed_height.url} alt={elem.title} />
                        <p>{elem.title}</p>
                    </li>
                ))}
            </ul>
        )
    }
}
export default GifList;