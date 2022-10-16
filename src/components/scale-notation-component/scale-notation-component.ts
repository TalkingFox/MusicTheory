import { EasyScore, Factory, SystemOptions } from "vexflow";

export class ScaleNotationComponent {
    private m_factory: Factory

    constructor(parentElement: HTMLElement) {
        this.m_factory = new Factory({
            renderer: {
                elementId: parentElement.id,
                height: 300,
                width: 1000
            }
        });
    }

    private appendSystem(options: SystemOptions) {
        const system = this.m_factory.System({ 
                x: options.x,
                y: options.y,
                width: options.width, 
                spaceBetweenStaves: 10 
        });
        return system;
    }

    public renderScale(width: number)  {
        const score = this.m_factory.EasyScore();
        score.set({time:'4/4'});

        this.renderTrebleClef(score, width);
        this.renderBassClef(score, width);
        
        this.m_factory.draw();
    }

    private renderTrebleClef(score: EasyScore, width: number) {
        let xPosition = 0;

        // Measure 1 - Up the scale part 1
        let system = this.m_factory.System({
            x: xPosition,
            y: 0,
            width: width/4,
            spaceBetweenStaves: 10            
        });        
        system
            .addStave({
                voices: [
                    score.voice(
                        score.notes(
                            'C4/q,D4,E4,F4',
                            {
                                clef: 'treble'
                            }
                        )
                    )
                ]
            })
            .addClef('treble')
            .addTimeSignature('4/4');
        system.addConnector('brace');
        system.addConnector('singleRight');
        system.addConnector('singleLeft');

        // measure 2 Up the scale part 2
        xPosition += width/4;

        system = this.m_factory.System({
            x: xPosition,
            y: 0,
            width: width/4,
            spaceBetweenStaves: 10
        });        
        system
            .addStave({
                voices: [
                    score.voice(
                        score.notes(
                            'G4/q,A4,B4,C5',
                            {
                                clef: 'treble'
                            }
                        )
                    )
                ]
            })
        
        // Measure 3 - Down the scale part 1
        xPosition += width/4;
        system = this.m_factory.System({
            x: xPosition,
            y: 0,
            width: width/4,
            spaceBetweenStaves: 10
        });
        system.addStave({
            voices: [
                score.voice(
                    score.notes(
                        'C5/4,B4,A4,G4',
                        {
                            clef: 'treble'
                        }
                    )
                )
            ]
        });

        // Measure 4 - Down the scale part 2
        xPosition += width/4;
        system = this.m_factory.System({
            x: xPosition,
            y: 0,
            width: width/4,
            spaceBetweenStaves: 10
        });
        system.addStave({
            voices: [
                score.voice(
                    score.notes(
                        'F4/q,E4,D4,C4',
                        {
                            clef: 'treble'
                        }
                    )
                )
            ]
        });
    }

    private renderBassClef(score: EasyScore, width: number) {
        let xPosition = 0;

        // Measure 1 - Up the scale part 1
        let system = this.m_factory.System({
            x: xPosition,
            y: 75,
            width: width/4,
            spaceBetweenStaves: 10
        });        
        system
            .addStave({
                voices: [
                    score.voice(
                        score.notes(
                            'C3/q,D3,E3,F3',
                            {
                                clef: 'bass'
                            }
                        )
                    )
                ]
            })
            .addClef('bass')
            .addTimeSignature('4/4');
        system.addConnector('brace');
        system.addConnector('singleRight');
        system.addConnector('singleLeft');

        // measure 2 - Up the scale part 2
        xPosition += width/4;

        system = this.m_factory.System({
            x: xPosition,
            y: 75,
            width: width/4,
            spaceBetweenStaves: 10
        });        
        system
            .addStave({
                voices: [
                    score.voice(
                        score.notes(
                            'G3/q,A3,B3,C4',
                            {
                                clef: 'bass'
                            }
                        )
                    )
                ]
            })
        
        // Measure 3 - Down the scale part 1
        xPosition += width/4;
        system = this.m_factory.System({
            x: xPosition,
            y: 75,
            width: width/4,
            spaceBetweenStaves: 10
        });
        system.addStave({
            voices: [
                score.voice(
                    score.notes(
                        'C4/4,B3,A3,G3',
                        {
                            clef: 'bass'
                        }
                    )
                )
            ]
        });

        // Measure 4 - Down the scale part 2
        xPosition += width/4;
        system = this.m_factory.System({
            x: xPosition,
            y: 75,
            width: width/4,
            spaceBetweenStaves: 10
        });
        system.addStave({
            voices: [
                score.voice(
                    score.notes(
                        'F3/q,E3,D3,C3',
                        {
                            clef: 'bass'
                        }
                    )
                )
            ]
        });
    }    
}