import React, { useState } from 'react';
import FormWrapper from '../Form/FormWrapper';
import { z } from 'zod';
import { FieldInput } from '../Ui/FieldInput';

const ProjectWorkshopZ = z.object({
  treatment: z.string(),
  treatment_chainage: z.string(),
  treatment_notes: z.string(),
  instrumentation_type: z.string(),
  it_chainage: z.string(),
  it_notes: z.string(),
});

export type ProjectWorkshopTypes = z.infer<typeof ProjectWorkshopZ>;

type ProjectWorkshopForm = ProjectWorkshopTypes & {
  onChangeField: (e: Partial<ProjectWorkshopTypes>) => void;
};

type TDTreatment = ProjectWorkshopForm & {
  noTreatments: number;
};

const TableDataTreatment = ({
  treatment,
  treatment_chainage,
  treatment_notes,
  onChangeField,
  noTreatments,
}: TDTreatment) => {
  return (
    <tr className="flex-1">
      {/* <td>{noTreatments}</td> */}
      <td className="min-w-[10rem] lg:min-w-[20rem] gap-4">
        <FieldInput
          placeHolder="treatment"
          titleLabel=""
          htmlFor="treatment"
          type="text"
          isTexArea={true}
          required={true}
          autoComplete={'off'}
          value={treatment}
          onChange={(e) => onChangeField({ treatment: e.target.value })}
          // errors={errors}
        />
      </td>
      <td className="min-w-[10rem] lg:min-w-[20rem]">
        <FieldInput
          placeHolder="treatment_chainage"
          titleLabel=""
          htmlFor="treatment_chainage"
          type="text"
          isTexArea={true}
          required={true}
          autoComplete={'off'}
          value={treatment_chainage}
          onChange={(e) =>
            onChangeField({ treatment_chainage: e.target.value })
          }
          // errors={errors}
        />
      </td>
      <td className="min-w-[10rem] lg:min-w-[20rem]">
        <FieldInput
          placeHolder="treatment_notes"
          titleLabel=""
          htmlFor="treatment_notes"
          type="text"
          isTexArea={true}
          required={true}
          autoComplete={'off'}
          value={treatment_notes}
          onChange={(e) => onChangeField({ treatment_notes: e.target.value })}
          // errors={errors}
        />
      </td>
    </tr>
  );
};

const TableDataInstrument = ({
  instrumentation_type,
  it_chainage,
  it_notes,
  onChangeField,
  noTreatments,
}: TDTreatment) => {
  return (
    <tr className="flex-1">
      {/* <td>{noTreatments}</td> */}
      <td className="min-w-[10rem] lg:min-w-[20rem] gap-4">
        <FieldInput
          placeHolder="instrumentation_type"
          titleLabel=""
          htmlFor="instrumentation_type"
          type="text"
          isTexArea={true}
          required={true}
          autoComplete={'off'}
          value={instrumentation_type}
          onChange={(e) =>
            onChangeField({ instrumentation_type: e.target.value })
          }
          // errors={errors}
        />
      </td>
      <td className="min-w-[10rem] lg:min-w-[20rem]">
        <FieldInput
          placeHolder="it_chainage"
          titleLabel=""
          htmlFor="it_chainage"
          type="text"
          isTexArea={true}
          required={true}
          autoComplete={'off'}
          value={it_chainage}
          onChange={(e) => onChangeField({ it_chainage: e.target.value })}
          // errors={errors}
        />
      </td>
      <td className="min-w-[10rem] lg:min-w-[20rem]">
        <FieldInput
          placeHolder="it_notes"
          titleLabel=""
          htmlFor="it_notes"
          type="text"
          isTexArea={true}
          required={true}
          autoComplete={'off'}
          value={it_notes}
          onChange={(e) => onChangeField({ it_notes: e.target.value })}
          // errors={errors}
        />
      </td>
    </tr>
  );
};

const FormWorkshop = ({
  treatment,
  treatment_chainage,
  treatment_notes,
  instrumentation_type,
  it_chainage,
  it_notes,
  onChangeField,
}: ProjectWorkshopForm) => {
  const [noTreatments, setNoTreatments] = useState([1]);

  const handleAddTreatment = () => noTreatments.push(+1);
  return (
    <div className="overflow-y-scroll w-full">
      <div className="flex flex-col w-full gap-2">
        <table className="table-auto text-sm lg:text-lg">
          <thead>
            <tr>
              <th>Treatment</th>
              <th>Chainage</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {noTreatments.map((row) => (
              <TableDataTreatment
                key={row}
                noTreatments={row}
                treatment={treatment}
                treatment_chainage={treatment_chainage}
                treatment_notes={treatment_notes}
                onChangeField={onChangeField}
                instrumentation_type={instrumentation_type}
                it_chainage={it_chainage}
                it_notes={it_notes}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col w-full gap-2 mt-4">
        <table className="table-auto text-sm lg:text-lg">
          <thead>
            <tr>
              <th>Instrumentation Type</th>
              <th>Chainage</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {noTreatments.map((row) => (
              <TableDataInstrument
                key={row}
                noTreatments={row}
                treatment={treatment}
                treatment_chainage={treatment_chainage}
                treatment_notes={treatment_notes}
                onChangeField={onChangeField}
                instrumentation_type={instrumentation_type}
                it_chainage={it_chainage}
                it_notes={it_notes}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormWorkshop;
