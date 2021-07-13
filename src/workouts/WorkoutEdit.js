import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

    const workoutUpdate = (event, workouts) => {
        event.preventDefault();
        fetch(`http://localhost:3000/log/update/${props.workoutToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({log: {description: editDesc, definition: editDef, result: editRes}}), 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        }).then(
            (response) => {
            props.fetchWorkouts();
            props.updateOff();
        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Log a Workout</ModalHeader>
            <ModalBody>
                <Form onSubmit={workoutUpdate}>
                    <FormGroup>
                        <label htmlFor="result">Edit Result:</label>
                        <Input name="result" value={editRes} onChange={(e) => setEditRes(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="description">Edit Description:</label>
                        <Input name="description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="definition">Edit Definition:</label>
                        <Input type="select" name="definition" value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                            <option></option>
                            <option value="Time">Time</option>
                            <option value="Weight">Weight</option>
                            <option value="Distance">Distance</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">Update the workout!</Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default WorkoutEdit;