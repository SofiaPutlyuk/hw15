import React, { Fragment } from "react";
import axios from "axios";
import './gifsearch.css'
import GifList from "./GifList";
import { FaSearchengin } from "react-icons/fa";
class GifSearch extends React.Component {
    state = {
        gifs: JSON.parse(localStorage.getItem("gif")) || [],
        gif: ""
    }
    handleInputGif = ({ target: { value } }) => {
        this.setState({
            gif: value
        })
    }
    componentDidMount() {
        const storedGif = localStorage.getItem("gif")
        if (storedGif) {
            this.setState({
                gifs: JSON.parse(storedGif)
            })
        }
    }
    handleSearchGif = async () => {
        const key = "nA4C3PcnalbYQL3hCOEP0hcTM58Rglt4"
        try {
            const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${this.state.gif}&limit=20&offset=0`)
            const newGif = response.data.data

            const updateGif = [...this.state.gifs, ...newGif]
            console.log(updateGif)
            this.setState({
                gifs: updateGif
            })
            localStorage.setItem("gif", JSON.stringify(updateGif))
        } catch (error) {
            console.log("Error", error.message)
        }

    }
    render() {
        const searchKeyGif = this.state.gifs.filter(gif => gif.title.toLowerCase().includes(this.state.gif.toLocaleLowerCase()))
        return (
            <Fragment>
                <h1>Search your favourite gif !</h1>
                <form>
                    <input type="text" placeholder="Gif search" onChange={this.handleInputGif} value={this.state.gif} className="inputGif" />
                    <button onClick={(e) => { e.preventDefault(); this.handleSearchGif() }}><FaSearchengin /></button>
                </form>
                <GifList gif={searchKeyGif} />
            </Fragment>
        )
    }
}
export default GifSearch;