import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import {animated, useSpring, useTrail, config} from 'react-spring';

const cards = [

    {
        id: '0',
        image: logo,
        title: 'card title',
    },

    {
        id: '1',
        image: logo,
        title: 'card title',
    },

    {
        id: '2',
        image: logo,
        title: 'card title',
    },

    {
        id: '3',
        image: logo,
        title: 'card title',
    },

    {
        id: '4',
        image: logo,
        title: 'card title',
    },

    {
        id: '5',
        image: logo,
        title: 'card title',
    },

    {
        id: '6',
        image: logo,
        title: 'card title',
    },

    {
        id: '7',
        image: logo,
        title: 'card title',
    },

    {
        id: '8',
        image: logo,
        title: 'card title',
    },

    {
        id: '9',
        image: logo,
        title: 'card title',
    },

    {
        id: '10',
        image: logo,
        title: 'card title',
    },

    {
        id: '11',
        image: logo,
        title: 'card title',
    },

];

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, []);

    const trailSprings = useTrail(cards.length, {
        from: {opacity: 0},
        to: {opacity: isLoading ? 0 : 1},
    });

    const titleSpring = useSpring({
        transform: isLoading ? 'translateY(-200px)' : 'translateY(0px)',
        from: {
            transform: 'translateY(-200px)',
        },
        config: config.slow
    });

    const descriptionSpring = useSpring({
        opacity: isLoading ? 0 : 1,
        from: {
            opacity: 0,
        },
        config: config.slow
    });

    const buttonSpring = useSpring({
        transform: isLoading ? 'scaleX(0)' : 'scaleX(1)',
        from: {
            transform: 'scaleX(0)',
        },
        config: config.slow
    });

    const slide = (direction) => {
        switch (direction) {
            case 'up':
                setPage(page => page - 1);
                break;
            case 'down':
                setPage(page => page + 1);
                break;
        }
    };

    const handleWheel = ({deltaY}) => {
        if (!isChanging) {
            setIsChanging(true);
            deltaY > 0
                ? page < 1 && slide('down')
                : page > 0 && slide('up')
        }
    };

    const mainSpring = useSpring({
        transform: `translate3d(0px,-${page * 100}vh,0px)`,
        onRest() {
            setIsChanging(false)
        }
    });

    return (
        <div className="App">
            {
                isLoading
                    ? <div className="lds-dual-ring"/>
                    :
                <animated.main onWheel={handleWheel} style={mainSpring}>
                    <section className="first-section">
                        <div className="first-section_top">
                            <div>
                                <animated.h1 style={titleSpring}>Title</animated.h1>
                                <animated.h6 style={descriptionSpring}>description</animated.h6>
                                <animated.button style={buttonSpring}>button</animated.button>
                            </div>
                        </div>
                        <div className="first-section_bottom">
                            {
                                trailSprings.map((spring, index) => <animated.div
                                    key={cards[index]}
                                    style={{
                                        ...spring
                                    }}
                                    className="card"
                                >
                                    <div className="card_header">
                                        <img src={logo} alt=""/>
                                    </div>

                                    <div className="card_body">
                                        <p>content</p>
                                    </div>

                                </animated.div>)
                            }
                        </div>
                    </section>
                    <section className="second-section">
                        SECOND SECTION
                    </section>
                </animated.main>
            }
        </div>
    );
}

export default App;
