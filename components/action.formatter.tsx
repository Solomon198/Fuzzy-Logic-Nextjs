// @ts-nocheck
/* eslint-disable */
import React from "react";
import SVG from "react-inlinesvg";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditDialog, openDeleteDialog }
) {
  // @ts-ignore
  return (
    <div className="d-flex justify-content-center">
      {/* <a
          title="Edit customer"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => {
            openEditCustomerDialog(row.id);
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
            /> 
          </span>
        </a> */}
      <div
        title="Delete customer"
        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-auto"
        onClick={() => openDeleteDialog(row)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={"/General/Trash.svg"} />
        </span>
      </div>
      <div
        title="Delete customer"
        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-auto"
        onClick={() => openEditDialog(row)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={"/General/Visible.svg"} />
        </span>
      </div>
    </div>
  );
}
