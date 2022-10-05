import dummyImg from '../assets/uploadImage.jpeg'
import React, { useState, useEffect }   from 'react'
import { Alert, Button, Card, Col, Container, Form, Row }  from 'react-bootstrap'

const ImageResizer = () => {
    
    const [ file, setFile ]         = useState('')
    const [ error, setError ]       = useState('')
    const [ imgName, setImgName ]   = useState("")
    const [ imgExt, setImgExt ]     = useState("")
    const [ imgWidth, setWidth ]    = useState('')
    const [ imgHeight, setHeight ]  = useState('')
    const [ imgTrue, setImgTrue ]   = useState(false)
    const [ image, setImage ]       = useState(dummyImg)
    const acceptedImgTypes      = ['image/gif', 'image/jpeg', 'image/png']

    const onFileDrop = async (e) => {
        e.preventDefault()
        const newFile = e?.target?.files[0]
        if (newFile) {
            if (!acceptedImgTypes.includes(newFile['type'])) {
                setError('Please upload an image')
                return
            }

            const imgExt    = newFile.name.split('.').pop()
            const imgName   = newFile.name.substr(0, newFile.name.lastIndexOf('.'))
            const image     = new Image()
            image.src = URL.createObjectURL(newFile)
            image.onload = function () {
                setWidth(this.width)
                setHeight(this.height)
            }

            setFile(newFile)
            setImgTrue(true)
            setImgExt(imgExt)
            setImgName(imgName)
            setImage(URL.createObjectURL(newFile))
        }
    }
    
    const handleName    = (e) => setImgName(e.target.value)
    const handleWidth   = (e) => setWidth(e.target.value)
    const handleHeight  = (e) => setHeight(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        Object.defineProperty(file, 'name', {
            writable: true,
            value: `${imgName}.${imgExt}`
        })
        console.log('FILE ', file)
        setImgExt('')
        setImgName('')
    }

    useEffect(() => {
      setError('')
      setWidth('')
      setHeight('')
    }, [file])
    
    const content = imgTrue 
    ? ( <>
            <Card.Body>
                <Form.Group className="mb-3" controlId="recipeName">
                    <Form.Label>Image name</Form.Label>
                    <Form.Control 
                        size="sm" 
                        type="text" 
                        name="imgName"
                        value={imgName}
                        placeholder="exampleImg" 
                        onChange={handleName}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="recipeName">
                    <Form.Label>Image width</Form.Label>
                    <Form.Control 
                        size="sm" 
                        type="number" 
                        name="width"
                        value={imgWidth}
                        placeholder="exp. 640" 
                        onChange={handleWidth}
                        required
                    />
                </Form.Group>
                <Form.Check 
                    type="checkbox"
                    id="autoResizing"
                    className='my-3'
                    label="Auto resizing height property"
                />
                <Form.Group className="mb-3" controlId="recipeName">
                    <Form.Label>Image height</Form.Label>
                    <Form.Control 
                        size="sm" 
                        type="number" 
                        name="height"
                        value={imgHeight}
                        placeholder="exp. 480" 
                        onChange={handleHeight}
                        required
                    />
                </Form.Group>
            </Card.Body>
            <Row className='mb-5 px-3'>
                <Col>
                    <Button type="submit" size='sm' className='w-100' 
                    >
                        Resize image
                    </Button>
                </Col>
            </Row>
            <Card.Footer
                className='text-center'
            >
                { file.name }
            </Card.Footer>
        </>
    ) : (
        <div className='text-center py-3'>Vaiting for drop image</div>
    ) 

    return (
        <>
            { error && <Alert variant='warning' className="text-center" >{ error }</Alert> }
                <header className='mt-5 text-center'><h1>Image Resizer</h1></header>
            <Container className="d-flex justify-content-center mt-3">
                <Card className='my-3' style={{ minHeight: '300px', width: "350px", borderRadius: '20px', overflow: 'hidden' }}>
                    <Form onSubmit={ handleSubmit } >
                        <div 
                            id="dndArea"
                            className="dndArea"
                        >
                            <Card.Img 
                                variant="top" 
                                src={ image }
                                height= "250px"
                                name="originalImg"
                            />
                            <header>Drag Or Drop File to Upload</header>
                            <span>Or select a File</span>
                            <input 
                                type="file" 
                                name="originalImg" 
                                accept="image/*" 
                                onChange={ onFileDrop } 
                            />
                        </div>
                        { content }
                    </Form>
                </Card>
            </Container>
        </>
    )
}

export default ImageResizer
