import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import FormWrapper from '../Form/FormWrapper';
import { FieldInput } from '../Ui/FieldInput';
import '@total-typescript/ts-reset/fetch';
import { API } from '@/constant';
import { Combobox } from '@headlessui/react';
import Calendar from '../Ui/Calender';

export interface DataNegeri {
  name: string;
}

export interface DataDistrict {
  '01000': string;
  'Alor Redeh': string;
  Kangar: string;
  PLS: string;
}

const ProjectInfo = z.object({
  state: z.string(),
  district: z.string(),
  project_name: z.string(),
  project_contractor: z.string(),
  project_cost: z.string(),
  project_cost_geotechnical: z.string(),
  project_duration: z.string(),
  project_procurement_method: z.string(),
  project_implementation_method: z.string(),
  project_possession_date: z.string(),
  project_completion_date: z.string(),
});

export type ProjectInfoTypes = z.infer<typeof ProjectInfo>;

type ProjectInfoForm = ProjectInfoTypes & {
  onChangeField: (e: Partial<ProjectInfoTypes>) => void;
};

const FormProjectInfo = ({
  state,
  district,
  project_name,
  project_contractor,
  project_cost,
  project_cost_geotechnical,
  project_duration,
  project_procurement_method,
  project_implementation_method,
  project_possession_date,
  project_completion_date,
  onChangeField,
}: ProjectInfoForm) => {
  const currentDate = new Date();
  const years = currentDate.getFullYear();
  const [showCalendar1, setShowCalendar1] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState('');
  const [selectedDate2, setSelectedDate2] = useState(project_completion_date);
  const [suggestionState, setSuggestionState] = useState<
    DataNegeri[] | undefined
  >();

  useEffect(() => {
    if (!state) return;
    if (state.length > 1) {
      API.get('/data/negeri.json').then((res) => {
        setSuggestionState(res.data.negeri_my);
      });
    }
  }, [state]);

  const valueFilter =
    state === ''
      ? suggestionState
      : suggestionState?.filter((val) =>
          val?.name.toLowerCase().includes(state.toLowerCase())
        );

  const handleShowCalendar1 = () => setShowCalendar1(!showCalendar1);
  const handleShowCalendar2 = () => setShowCalendar2(!showCalendar2);

  return (
    <div className="overflow-y-scroll w-full">
      <div className="flex flex-col w-full gap-2">
        <Combobox value={state} onChange={(e) => onChangeField({ state: e })}>
          <label htmlFor={state}>State Name</label>
          <Combobox.Input
            className="p-2 text-sm lg:text-lg"
            value={state}
            required={true}
            placeholder="Select a State"
            onChange={(e) => onChangeField({ state: e.target.value })}
          />
          <Combobox.Options className="bg-gray-500/30 mb-5 p-2 max-h-32 overflow-y-auto">
            {valueFilter?.map((item, id) => (
              <Combobox.Option
                className="hover:cursor-pointer my-2"
                key={id}
                value={item?.name}
              >
                {item?.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>

        <FieldInput
          placeHolder="district"
          titleLabel="District Name"
          htmlFor="district"
          type="text"
          required={true}
          autoComplete={'off'}
          value={district}
          onChange={(e) => onChangeField({ district: e.target.value })}
          // errors={errors}
        />
        <FieldInput
          placeHolder="project_name"
          titleLabel="Project Name"
          htmlFor="project_name"
          type="text"
          required={true}
          autoComplete={'off'}
          value={project_name}
          onChange={(e) => onChangeField({ project_name: e.target.value })}
          // errors={errors}
        />
        <FieldInput
          placeHolder="project_contractor"
          titleLabel="Project Contractor"
          htmlFor="project_contractor"
          type="text"
          required={true}
          autoComplete={'off'}
          value={project_contractor}
          onChange={(e) =>
            onChangeField({ project_contractor: e.target.value })
          }
          // errors={errors}
        />
        <FieldInput
          placeHolder="project_cost"
          titleLabel="Project Cost"
          htmlFor="project_cost"
          type="number"
          required={true}
          autoComplete={'off'}
          value={project_cost}
          onChange={(e) => {
            onChangeField({
              project_cost: e.target.value.toString(),
            });
          }}
          // errors={errors}
        />
        <FieldInput
          placeHolder="project_cost_geotechnical"
          titleLabel="Project Cost Geotechnical"
          htmlFor="project_cost_geotechnical"
          type="number"
          required={true}
          autoComplete={'off'}
          value={project_cost_geotechnical}
          onChange={(e) =>
            onChangeField({
              project_cost_geotechnical: e.target.value.toString(),
            })
          }
          // errors={errors}
        />
        <FieldInput
          placeHolder="project_duration"
          titleLabel="Project Duration"
          htmlFor="project_duration"
          type="text"
          required={true}
          autoComplete={'off'}
          value={project_duration}
          onChange={(e) => onChangeField({ project_duration: e.target.value })}
          // errors={errors}
        />
        <FieldInput
          placeHolder="project_procurement_method"
          titleLabel="Project Procurement Method"
          htmlFor="project_procurement_method"
          type="text"
          required={true}
          autoComplete={'off'}
          value={project_procurement_method}
          onChange={(e) =>
            onChangeField({ project_procurement_method: e.target.value })
          }
          // errors={errors}
        />
        <FieldInput
          placeHolder="project_implementation_method"
          titleLabel="Project Implementation Method"
          htmlFor="project_implementation_method"
          type="text"
          required={true}
          autoComplete={'off'}
          value={project_implementation_method}
          onChange={(e) =>
            onChangeField({ project_implementation_method: e.target.value })
          }
          // errors={errors}
        />
        <FieldInput
          placeHolder="YYYY/MM/DD"
          titleLabel="Project Possession Date"
          htmlFor="project_possession_date"
          type="text"
          isDateTime={true}
          showCalendar={showCalendar1}
          onShowCalendar={handleShowCalendar1}
          required={true}
          autoComplete={'off'}
          value={project_possession_date}
          onChange={(e) =>
            onChangeField({
              project_possession_date: e.target.value,
            })
          }
          // errors={errors}
        />
        {showCalendar1 === true && (
          <Calendar
            setSelectedDate={(e) => {
              const date1_year = new Date(e).getFullYear();
              const date1_month = new Date(e).getMonth();
              const date1_day = new Date(e).getDate();
              onChangeField({
                project_possession_date: `${date1_year}/${date1_month}/${date1_day}`,
              });
            }}
            yearlyLeaves={years.toString()}
            setShowCalendar={() => setShowCalendar1(false)}
          />
        )}
        <FieldInput
          placeHolder="YYYY/MM/DD"
          titleLabel="Project Completion Date"
          htmlFor="project_completion_date"
          type="text"
          isDateTime={true}
          showCalendar={showCalendar2}
          onShowCalendar={handleShowCalendar2}
          required={true}
          autoComplete={'off'}
          value={project_completion_date}
          onChange={(e) =>
            onChangeField({ project_completion_date: e.target.value })
          }
          // errors={errors}
        />
        {showCalendar2 === true && (
          <Calendar
            setSelectedDate={(e) => {
              const date1_year = new Date(e).getFullYear();
              const date1_month = new Date(e).getMonth();
              const date1_day = new Date(e).getDate();
              onChangeField({
                project_completion_date: `${date1_year}/${date1_month}/${date1_day}`,
              });
            }}
            yearlyLeaves={years.toString()}
            setShowCalendar={() => setShowCalendar2(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FormProjectInfo;
