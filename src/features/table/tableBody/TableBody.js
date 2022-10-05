import React, {useState} from 'react'
import CompatibilityInput from './CompatibilityInput'
import {useSelector, useDispatch} from "react-redux"
import { selectTableBodyData, changeCompatibility, deleteSpecifiedEvidence} from '../tableSlice'
import EditEvidenceIconAndModal from './EditEvidenceIconAndModal.js'
import "./tableBody.scss"
const TableBody = () => {

    const tableBodyData = useSelector(selectTableBodyData)

    const dispatch = useDispatch()

    const [visibility, setvisibility] = useState(Array(tableBodyData.length).fill({display: 'none'}));

    const editIcon = <i role="button" class="bi bi-pen-fill"></i>
    const deleteIcon = <i class="bi bi-trash3-fill"></i>

  return (
    <tbody>
    {tableBodyData.map((tableRow, tableRowindex) => 
        <tr
        key={tableBodyData + tableRowindex}
        >
                {/* evidence name */}
            <td  className='nameCell' >

                <span className='d-flex flex-row justify-content-center'>
                <span className='iconsWrapper'>
                        <EditEvidenceIconAndModal visibility = {visibility[tableRowindex]} name = {tableRow.name} 
                        type = {tableRow.type} credibility = {tableRow.credibility}
                        relevance = {tableRow.relevance}
                        index = {tableRowindex}/> 
                        &nbsp;
                        <span  role="button" className='editEvidenceIcon animate__animated animate__infinite  animate__pulse' onClick = {() => {dispatch(deleteSpecifiedEvidence(tableRowindex))}}
                        >
                        {deleteIcon}
                        </span>
                </span>
                &nbsp;
                {tableRow.name}
                </span>
            </td>
            <td>{tableRow.type}</td>
            <td>{tableRow.credibility}</td>
            <td>{tableRow.relevance}</td>
            {
                tableRow.inputCells.map((cell, cellIndex)  => {
                    const settings = "letters" // words letters symbols

                    if(settings === "words"){
                    switch (cell) {
                        //case compatible
                        case "C":
                            return <td className='inputCell'>Compatible<span  className='editIcon' onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;{editIcon}</span></td>
                        //case neutral
                        case "N":
                            return <td className='inputCell'>Neutral<span className='editIcon' onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;{editIcon}</span></td>
                        //case incompatible
                        case "I":
                            return <td className='inputCell'>Incompatible<span  className='editIcon' onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;{editIcon}</span></td>
                        //case undefined
                        default:
                            return <td className='inputCell'><CompatibilityInput tableRowindex = {tableRowindex} cellIndex  = {cellIndex}></CompatibilityInput></td>
                    }
                }
                else if(settings === "letters"){
                    switch (cell) {
                        //case compatible
                        case "C":
                            return <td className='inputCell'>C<span  className='editIcon' onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;{editIcon}</span></td>
                        //case neutral
                        case "N":
                            return <td className='inputCell'>N<span  className='editIcon'  onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;{editIcon}</span></td>
                        //case incompatible
                        case "I":
                            return <td className='inputCell'>I<span  className='editIcon' onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;{editIcon}</span></td>
                        //case undefined
                        default:
                            return <td className='inputCell'><CompatibilityInput tableRowindex = {tableRowindex} cellIndex  = {cellIndex}></CompatibilityInput></td>
                    }
                }
                else{
                    switch (cell) {
                        //case compatible
                        case "C":
                            return <td className='inputCell'>+<span className='editIcon' onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;{editIcon}</span></td>
                        //case neutral
                        case "N":
                            return <td className='inputCell'>±<span className='editIcon' onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;{editIcon}</span></td>
                        //case incompatible
                        case "I":
                            return <td className='inputCell'>-<span className='editIcon' onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;{editIcon}</span></td>
                        //case undefined
                        default:
                            return <td className='inputCell'><CompatibilityInput tableRowindex = {tableRowindex} cellIndex  = {cellIndex}></CompatibilityInput></td>
                    }
                }




                }
                )
            }
        </tr>
    )}
</tbody>
  )
}

export default TableBody