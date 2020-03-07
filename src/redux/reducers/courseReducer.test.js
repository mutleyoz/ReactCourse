import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

it('should add a course when passed CREATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
        {
            title: "A"
        },
        {
            title: "B"
        }
    ];

    const newCourse = {
        title: "C"
    };

    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual("A");
    expect(newState[1].title).toEqual("B");
    expect(newState[2].title).toEqual("C");
});


it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    //arrange
    const initialState = [
        {id: 1, title: "A"},
        {id: 2, title: "B"},
        {id: 3, title: "C"}
    ];

    const updateCourse = {
        id: 2,
        title: "D"
    };

    const action = actions.updateCourseSuccess(updateCourse);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == updateCourse.id);
    const unmodifiedCourse = newState.find(a => a.id == 1);

    // assert
    expect(newState.length).toEqual(3);
    expect(unmodifiedCourse.title).toEqual("A");
    expect(updatedCourse.title).toEqual("D");
}) 
