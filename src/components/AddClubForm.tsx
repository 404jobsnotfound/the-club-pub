'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addClub } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddClubSchema, Club } from '@/lib/validationSchemas';

const AddClubForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Club>({
    resolver: yupResolver(AddClubSchema),
  });

  const onSubmit = async (data: Club) => {
    // Ensure currentUser's email is included in admins, but not duplicated
    let admins = data.admins || '';
    if (!admins.includes(currentUser)) {
      admins = `${currentUser}, ${admins}`;
    }

    // Pass the updated data with the admins field
    await addClub({ ...data, admins });

    swal('Success', 'Your club has been added', 'success', {
      timer: 2000,
    });
    reset();
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Club</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Club Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    type="text"
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Meeting Time</Form.Label>
                  <input
                    type="text"
                    {...register('meetingTime')}
                    className={`form-control ${errors.meetingTime ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.meetingTime?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    type="text"
                    {...register('meetingLocation')}
                    className={`form-control ${errors.meetingLocation ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.meetingLocation?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Interest Areas</Form.Label>
                  <input
                    type="text"
                    {...register('interestAreas')}
                    className={`form-control ${errors.interestAreas ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.interestAreas?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>
                {/* Admins input field */}
                <Form.Group>
                  <Form.Label>Admins (comma separated emails)</Form.Label>
                  <input
                    type="text"
                    {...register('admins')}
                    className={`form-control ${errors.admins ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.admins?.message}</div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddClubForm;
