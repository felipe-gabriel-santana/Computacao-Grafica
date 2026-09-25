// ==================================================
// CLASS - SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        this.renderer =
            new Renderer(gl, program);

        // Figura que será exibida
        this.helicopterBody = new HelicopterBody();

        this.helicopterTopShaft = new HelicopterTopShaft();

        this.helicopterTail = new HelicopterTail();

        this.helicopterPropellers = new HelicopterPropellers();

        this.helicopterTailPropeller = new HelicopterTailPropeller();

        this.theta = 0.00;

        this.thetaIncremento = 0.05;

        this.inclinacao = 0;

        this.tx = 0.0;
        
        this.ty = 0.0;

    }

    update() {

        this.theta += this.thetaIncremento;

        this.helicopterBody.update(
            m4.multiply(
                m4.translation(this.tx, this.ty,0.0), //move
                m4.zRotation(this.inclinacao) //rotaciona
            )
        );//CORPO DO HELICOPTERO


        this.helicopterTopShaft.update(
            m4.multiply(
                m4.translation(this.tx, this.ty, 0.0), //translada a partir da posicao original
                m4.zRotation(this.inclinacao)
            )
        );//BARRA DA HELICE CENTRAL
        
        this.helicopterTail.update(
            m4.multiply(
                m4.translation(this.tx, this.ty, 0.0), //translada a partir da posicao original
                m4.zRotation(this.inclinacao)
            )
        );

        this.helicopterPropellers.update(
            m4.multiply(
                m4.translation(this.tx, this.ty,0.0),
                m4.multiply(
                    m4.zRotation(this.inclinacao),
                    m4.yRotation(this.theta)
                )
            )
        ); // HELICE CENTRAL
        
        
        this.helicopterTailPropeller.update(
            m4.multiply(
                m4.translation(this.tx, this.ty, 0.0), //translada a partir da posicao original
                m4.multiply(
                    m4.zRotation(this.inclinacao),
                    m4.multiply(
                        m4.translation(0.7,0,0.0), //move para a posicao original
                        m4.multiply(
                            m4.zRotation(this.theta), //rotaciona
                            m4.translation(-0.7,0,0.0), //move para origem
                        )
                    )
                )
            )
        ); //HELICE TRASEIRA
    }

    draw() {

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

        gl.useProgram(program);

        this.helicopterBody.draw(
            this.renderer
        );

        this.helicopterTopShaft.draw(
            this.renderer
        );

        this.helicopterTail.draw(
            this.renderer
        );

        this.helicopterPropellers.draw(
            this.renderer
        );

        this.helicopterTailPropeller.draw(
            this.renderer
        );
    }

    execute() {
        this.update();
        this.draw();

        requestAnimationFrame(
            () => this.execute()
        );
    }

    init() {
        requestAnimationFrame(
            () => this.execute()
        );
    }
}