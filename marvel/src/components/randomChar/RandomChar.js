import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../services/MarvelService';

class RandomChar extends Component {
    state = {
        char : {},
        loading : true
    }
    marvelService = new MarvelService();

    onCharLoaded = (char) =>{
        const updatedChar = {
            ...char,
            description : char.description ? `${char.description.slice(0, 210)}...`: 'sorry, there is no description',
            
        }
        this.setState({char : updatedChar , loading : false})
    }

    componentDidMount() {
        this.updateCharacter();
        
    }

    onCharLoading = () =>{
        this.setState({
            loading : true
        })
    }

    onError = () =>{
        this.setState({
            loading : false,
            error : true
        })
    }
        
    updateCharacter = () =>{
        const id = Math.floor(Math.random()* (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
    
    render(){
        const {char , loading , error} = this.state;
        const errorMessage = error ? <Error/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char = {char} /> : null
        
        return (
            <div className="randomchar">
                {errorMessage}  {spinner}  {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button  className="button button__main">
                        <div    onClick={this.updateCharacter} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) =>{
    const   {name,description,thumbnail,homepage,wiki} = char
    return (
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}
export default RandomChar;