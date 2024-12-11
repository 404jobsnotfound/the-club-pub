/* eslint-disable react/prop-types */

'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Club, EditClubSchema } from '@/lib/validationSchemas';
import { updateClub, deleteClub, getClubById } from '@/lib/dbActions';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

const AdminEditForm: React.FC<{ id: number }> = ({ id }) => {
  const [, setClubData] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Club>({
    resolver: yupResolver(EditClubSchema),
  });

  useEffect(() => {
    const fetchClubData = async () => {
      setLoading(true);
      try {
        const club = await getClubById(id);
        if (club) {
          setClubData(club);
          reset({
            name: club.name,
            description: club.description,
            meetingTime: club.meetingTime,
            meetingLocation: club.meetingLocation,
            interestAreas: club.interestAreas,
            image: club.image,
            admins: club.admins,
          });
        }
      } catch (error) {
        console.error('Failed to fetch club data:', error);
        swal('Error', 'Failed to load club data', 'error');
      }
      setLoading(false);
    };

    fetchClubData();
  }, [id, reset]);

  const onSubmit = async (data: Club) => {
    try {
      await updateClub(id, data);
      swal('Success', 'Your club has been updated', 'success', {
        timer: 2000,
      });
      router.push('/admin'); // Redirect to admin page after update
    } catch (error) {
      console.error('Error updating club:', error);
      swal('Error', 'Failed to update club', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this club!',
        icon: 'warning',
        buttons: [true, true],
        dangerMode: true,
      });
      if (confirmed) {
        await deleteClub(id);
        swal('Deleted!', 'The club has been deleted.', 'success', {
          timer: 2000,
        });
        router.push('/admin'); // Redirect to admin page after deletion
      }
    } catch (error) {
      console.error('Error deleting club:', error);
      swal('Error', 'Failed to delete club', 'error');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center text-white">
            <h2>Edit Club</h2>
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
                  <Form.Label>Club Description</Form.Label>
                  <textarea
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
                  <Form.Label>Meeting Location</Form.Label>
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
                  <Form.Label>Club Image</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Admins</Form.Label>
                  <input
                    type="text"
                    {...register('admins')}
                    className={`form-control ${errors.admins ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.admins?.message}</div>
                </Form.Group>
                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      onClick={() => reset()}
                      variant="warning"
                      className="float-right"
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Row className="pt-3">
                <Col>
                  <Button
                    variant="danger"
                    className="float-right"
                    onClick={handleDelete}
                  >
                    Delete Club
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditForm;
